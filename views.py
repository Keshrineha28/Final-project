from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Video
from .serializers import RegisterSerializer, VideoSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Like
from .serializers import LikeSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Comment
from .serializers import CommentSerializer
from rest_framework import generics

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        video_id = self.kwargs['video_id']
        return Comment.objects.filter(video_id=video_id).order_by('-created_at')

    def perform_create(self, serializer):
        video_id = self.kwargs['video_id']
        serializer.save(user=self.request.user, video_id=video_id)


# Register user
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

# Upload video
class UploadVideoView(generics.CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# List all videos
class VideoListView(generics.ListAPIView):
    queryset = Video.objects.all().order_by('-uploaded_at')
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]

# Get single video
class VideoDetailView(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]
    
class LikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):  # <-- get `pk` from URL
        user = request.user

        try:
            like_obj, created = Like.objects.get_or_create(user=user, video_id=pk)
            if not created:
                like_obj.delete()
                return Response({"liked": False})
            return Response({"liked": True})
        except:
            return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
