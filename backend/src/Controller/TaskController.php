<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

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
            $pricePerPoint = $user->getPracePerPoint();

            foreach ($project->getTasks() as $task) {
                $tasksData[] = [
                    'taskId' => $task->getId(),
                    'taskName' => $task->getName(),
                    'projectId' => $project->getId(),
                    'projectName' => $project->getDescription(),
                    'projectPoints' => $project->getPoints(),
                    'projectValue' => $pricePerPoint * $project->getPoints(),
                ];
            }
        }

        return $this->json($tasksData);
    }
}
