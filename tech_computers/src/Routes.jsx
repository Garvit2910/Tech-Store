import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import ProductCatalogHomepage from "pages/product-catalog-homepage";
import ProductCategoryListing from "pages/product-category-listing";
import ProductDetailPage from "pages/product-detail-page";
import AdminLogin from "pages/admin-login";
import AdminDashboard from "pages/admin-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ProductCatalogHomepage />} />
          <Route path="/product-catalog-homepage" element={<ProductCatalogHomepage />} />
          <Route path="/product-category-listing" element={<ProductCategoryListing />} />
          <Route path="/product-detail-page" element={<ProductDetailPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;