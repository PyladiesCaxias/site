from django.shortcuts import render

from django.views.generic.detail import DetailView
from django.views.generic.list import ListView


from blog.models import Post, PostImage, BlogTag

class PostDetailView(DetailView):

    model = Post

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['images'] = self.object.images.all()
        return context


class PostListView(ListView):

    model = Post
    paginate_by = 25  # if pagination is desired
