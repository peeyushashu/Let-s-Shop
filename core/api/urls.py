from django.urls import path
from .views import (ItemListView,
                    AddToCart,
                    OrderDetailView,
                    AddCouponView
                    )

app_name = 'core'


urlpatterns = [
    path('product-list/', ItemListView.as_view(), name='Product-list'),
    path('add-to-cart/', AddToCart.as_view(), name='add-to-cart'),
    path('fetch-cart/', OrderDetailView.as_view(), name='fetch-cart'),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
]
