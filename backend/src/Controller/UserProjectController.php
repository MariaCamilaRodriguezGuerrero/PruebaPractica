<?php

namespace App\Controller;

use App\Repository\UserProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class UserProjectController extends AbstractController
{
    #[Route('/api/project/{projectId}/cost/{cost}', name: 'app_user_project_update_cost', methods: ['PUT'])]
    public function updateCostByProject(
        int $projectId,
        float $cost,
        UserProjectRepository $userProjectRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $userProject = $userProjectRepository->findOneBy(['project' => $projectId]);

        if (!$userProject) {
            return $this->json(['error' => 'UserProject not found'], 404);
        }

        $userProject->setCost($cost);
        $em->persist($userProject);
        $em->flush();

        return $this->json([
            'message' => 'Cost updated successfully',
            'project_id' => $projectId,
            'cost' => $cost,
        ]);
    }
}
