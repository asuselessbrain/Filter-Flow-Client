import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user,logOut } = useAuth();

  return (
    <div>
      {user && (
        <div>
          user is logged in
          <button onClick={() => logOut()}>Logout</button>
        </div>
      )}
      {
        !user && <button>Login</button>
      }
    </div>
  );
};

export default Home;
