from django.contrib import admin
from .models import Post, PostImage, BlogTag


class PostImageInline(admin.TabularInline):
    """
    Gallery Image inline
    """
    model = PostImage
    extra = 0

class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageInline,]
    model = Post

admin.site.register(Post, PostAdmin)
admin.site.register(BlogTag)
