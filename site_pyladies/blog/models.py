from django.db import models
from django.utils import timezone


class BlogTag(models.Model):
    tag = models.CharField(max_length=200)

    def __str__(self):
        return self.tag


class Post(models.Model):
    CHOICES_STATUS = (
        ('r', 'Rascunho'),
        ('p', 'Publicado'),
        ('x', 'Removido'),
    )
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    status = models.CharField(choices=CHOICES_STATUS, max_length=1, default='r')
    created_date = models.DateTimeField(
        default=timezone.now)
    published_date = models.DateTimeField(
        blank=True, null=True)
    tags = models.ManyToManyField(
        BlogTag, blank=True, related_name='tags')

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title


class PostImage(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='images')
    title = models.CharField(max_length=200)
    principal = models.BooleanField(blank=True)
    imagem = models.ImageField(upload_to='images')

    def __str__(self):
        return self.title
