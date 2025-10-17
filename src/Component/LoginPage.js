import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 로그인 API 호출 및 검증
    if (username.trim() === "") {
      alert("사용자 이름을 입력하세요.");
      return;
    }
    try {
      await api.post(
        "/api/auth/login",
        new URLSearchParams({ username, password })
      );
      //현재 로그인한 사용자 정보 가져오기
      const res = await api.get("api/auth/me");
      onLogin(res.data.username); //app에서 전달된 props인 onlogin의 값으로 로그인한 유저의 username전달
      alert("로그인 성공");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          사용자 이름
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자 이름"
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
