import { Switch } from 'react-router';
import Concepts from './viewConcepts/Concepts';
import EditConcepts from './editConcepts/EditConcepts';
import CreateConcepts from './createConcepts/CreateConcepts';
import Subconcepts from './viewSubconcepts/Subconcepts';
import EditSubconcept from './editSubconcept/EditSubconcept';
import AdminMainPage from './Subconcept';
import CreateSubconcept from './createSubconcept/CreateSubconcept';
import AdminProtectedRoute from './AdminProtectedRoute';

const AdminRoutesWrapper = () => {
  return (
    <Switch>
      <AdminProtectedRoute exact path="/admin/concepts">
        <Concepts />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path="/admin/concepts/create">
        <CreateConcepts />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path="/admin/concepts/:conceptId/edit">
        <EditConcepts />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path="/admin/concepts/:conceptId/create">
        <CreateSubconcept />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path="/admin/concepts/:conceptId">
        <Subconcepts />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path="/admin/subconcepts/:subconceptId">
        <AdminMainPage />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path="/admin/concepts/:conceptId/subconcepts/:subconceptId/edit">
        <EditSubconcept />
      </AdminProtectedRoute>
    </Switch>
  );
};

export default AdminRoutesWrapper;
