// import { Redirect } from 'react-router-dom';
// import { useStoreState, useStoreActions } from 'easy-peasy';
import UserConcepts from '../concepts/UserConcepts';
import UserSubconcepts from '../subconcepts/UserSubconcepts';
import Verify from '../auth/Verify';
import MainPage from '../mainPage/MainPage';
import Editor from '../editor/Editor';
import References from '../references/References';
import Profile from '../user/profile';
import Settings from '../user/settings';
import Homepage from '../homepage/Homepage';
import ProtectedRoute from './ProtectedRoute';
import VerifyProtectedRoute from './VerifyProtectedRoute';

const UserRoutesWrapper = () => {
  return (
    <>
      <ProtectedRoute exact path="/">
        <Homepage />
      </ProtectedRoute>
      <VerifyProtectedRoute exact path="/verify">
        <Verify />
      </VerifyProtectedRoute>
      <ProtectedRoute exact path="/concepts">
        <UserConcepts />
      </ProtectedRoute>
      <ProtectedRoute exact path="/concepts/:conceptId">
        <UserSubconcepts />
      </ProtectedRoute>
      <ProtectedRoute exact path="/subconcepts/:subconceptId">
        <MainPage />
      </ProtectedRoute>
      <ProtectedRoute exact path="/editor">
        <Editor />
      </ProtectedRoute>
      <ProtectedRoute exact path="/references">
        <References />
      </ProtectedRoute>
      <ProtectedRoute exact path="/profile">
        <Profile />
      </ProtectedRoute>
      <ProtectedRoute exact path="/settings">
        <Settings />
      </ProtectedRoute>
    </>
  );
};

export default UserRoutesWrapper;
