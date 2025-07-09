from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UploadVideoView, VideoListView, VideoDetailView
from .views import LikeToggleView
from .views import CommentListCreateView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),  # JWT login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT refresh

    path('upload/', UploadVideoView.as_view(), name='upload_video'),
    path('videos/', VideoListView.as_view(), name='video_list'),
    path('videos/<int:pk>/', VideoDetailView.as_view(), name='video_detail'),
    path('videos/<int:pk>/like/', LikeToggleView.as_view(), name='like-toggle'),
    path('videos/<int:video_id>/comments/', CommentListCreateView.as_view(), name='video-comments'),
]
