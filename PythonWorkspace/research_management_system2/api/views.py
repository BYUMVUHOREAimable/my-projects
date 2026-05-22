from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from project.models import ResearchProject
from data.models import DataCollection
from django.shortcuts import get_object_or_404

class ResearchProjectViewSet(viewsets.ModelViewSet):
    queryset = ResearchProject.objects.all()
    serializer_class = ResearchProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ResearchProject.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['get'])
    def data_collections(self, request, pk=None):
        project = self.get_object()
        data_collections = DataCollection.objects.filter(project=project)
        serializer = DataCollectionSerializer(data_collections, many=True)
        return Response(serializer.data)

class DataCollectionViewSet(viewsets.ModelViewSet):
    queryset = DataCollection.objects.all()
    serializer_class = DataCollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DataCollection.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        project_id = self.request.data.get('project')
        project = get_object_or_404(ResearchProject, id=project_id)
        serializer.save(user=self.request.user, project=project)
