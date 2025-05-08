function Header({ isLogin, userId, onLoginClick, onLogout }) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid #ccc"
      }}>
        {isLogin ? (
          <>
            <span style={{ marginRight: "1rem", fontWeight: "bold" }}>{userId}</span>
            <button onClick={onLogout}>로그아웃</button>
          </>
        ) : (
          <button onClick={onLoginClick}>로그인</button>
        )}
      </div>
    );
  }
  
  export default Header;
  