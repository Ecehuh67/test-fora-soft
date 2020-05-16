const AuthPage = () => {

  return (
    <main className="main-page html-wrapper">
        <section className="main-page_wrapper">
          <h1 className="main-page_caption visually-hidden">Authentication data</h1>

          <div className="main-page_color-cap">
            <h2 className="main-page_cap-caption">Welcome to the Light Chat, please authorize yourself to be able to talk with others</h2>
          </div>

          <div className="main-page_content">
            <input className="main-page_content-roomNumber main-page_input" type="text" placeholder="Room number"/>
            <input className="main-page_content-userName main-page_input" type="text" placeholder="User name"/>
            <button className="main-page_content-button" type="button">Enter</button>
          </div>
        </section>
      </main>
  );
};

export default AuthPage;