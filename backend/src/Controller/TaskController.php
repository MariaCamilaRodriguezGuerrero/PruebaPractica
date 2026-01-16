<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Project;
use App\Entity\User;
use App\Entity\Task;

final class TaskController extends AbstractController
{
     #[Route('/api/user/{id}/tasks', name: 'user_tasks', methods: ['GET'])]
    public function getUserTasks($id, UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->find($id);

        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        $tasksData = [];

        foreach ($user->getUserProjects() as $userProject) {
            $project = $userProject->getProject();
            $projectValue = $userProject->getCost();
            $pricePerPoint = $user->getPracePerPoint();

            foreach ($project->getTasks() as $task) {
                $tasksData[] = [
                    'taskId' => $task->getId(),
                    'taskName' => $task->getName(),
                    'projectId' => $project->getId(),
                    'projectName' => $project->getName(),
                    'projectPoints' => $project->getPoints(),
                    'projectValue' => $projectValue > 0 ? $projectValue : $pricePerPoint * $project->getPoints(),
                ];
            }
        }

        return $this->json($tasksData);
    }

    #[Route('/api/task', name: 'app_task_create', methods: ['POST'])]
    public function createTask(
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $projectId = $data['projectId'] ?? null;
        $userId = $data['userId'] ?? null;
        $name = $data['name'] ?? null;
        $description = $data['description'] ?? null;

        if (!$projectId || !$userId || !$name) {
            return $this->json(['error' => 'Missing required fields'], 400);
        }

        $project = $em->getRepository(Project::class)->find($projectId);
        $user = $em->getRepository(User::class)->find($userId);

        if (!$project || !$user) {
            return $this->json(['error' => 'Project or User not found'], 404);
        }

        $task = new Task();
        $task->setName($name);
        $task->setDescription($description);
        $task->setProject($project);
        $task->setCreatedAt(new \DateTime());
        $task->setUser($user);

        $em->persist($task);
        $em->flush();

        return $this->json([
            'message' => 'Task created successfully',
            'taskId' => $task->getId(),
        ], 201);
    }
}
