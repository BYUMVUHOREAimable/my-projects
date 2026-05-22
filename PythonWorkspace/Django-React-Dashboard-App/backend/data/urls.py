from django.contrib import admin
from django.urls import path
<<<<<<< HEAD
from rest_framework.routers import DefaultRouter
from .views import * 

router = DefaultRouter()
router.register('supermarketsales',SuperMarketSalesViewset, basename='supermarketsales')
router.register('branchedata',BrancheDataViewset, basename='branchedata')
router.register('genderdata',GenderDataViewset, basename='genderdata')
router.register('productbranchedata',ProductBrancheViewset, basename='productbranchedata')
router.register('countrydata',CountryDataViewet, basename='countrydata')

urlpatterns = router.urls
=======

urlpatterns = [
    
]
>>>>>>> bf55619 (New initial commit)
