from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResearchProjectViewSet, DataCollectionViewSet
from .authentication import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'projects', ResearchProjectViewSet)
router.register(r'data-collections', DataCollectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]