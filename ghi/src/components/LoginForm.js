function LoginForm(props) {
  return (
    <div className="container">
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="username"
          class="form-control"
          id="username"
          aria-describedby="emailHelp"
          placeholder="Enter username"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
    </div>

  );
}
export default LoginForm;
