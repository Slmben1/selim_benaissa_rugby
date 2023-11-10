from django.urls import path
from django.contrib import admin
from .views import HomeView, StadiumsView, TeamsView, NewsletterView, UpdateView, AboutView, api_stadiums, api_events, api_teams, api_tickets

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("stadiums", StadiumsView.as_view(), name="stadiums"),
    path("teams", TeamsView.as_view(), name="teams"),
    path("newsletter", NewsletterView.as_view(), name="newsletter"),
    path("about", AboutView.as_view(), name="about"),
    path("update", UpdateView.as_view(), name="update"),
    # Les liens pour l'accès aux API et fichiers Json
    path("api/stadiums", api_stadiums, name="api_stadiums"),
    path("api/events", api_events, name="api_events"),
    path("api/teams", api_teams, name="api_teams"),
    path("api/tickets/<str:pk>/", api_tickets, name="api_tickets"),

    path("admin/", admin.site.urls),
]

