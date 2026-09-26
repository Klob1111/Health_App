const navicons = [" bi-house-fill", " bi-fire"];
const iconsize = "40px";

const NavBar = ({ activelink, changePage, linkitems }) => {
  return (
    <nav className='navbar navbar-expand bg-dark-subtle fixed-bottom p-0'>
      <div className='container-fluid p-0'>
        <div className='navbar-nav w-100 d-flex justify-content-around'>
          {linkitems.map((item, index) => {
            const isactive = activelink == linkitems[index] ? " active" : "";
            const navdisplay =
              navicons[index] !== undefined ? (
                <i
                  className={navicons[index] + isactive}
                  style={{ fontSize: iconsize }}
                />
              ) : (
                <p className={isactive} style={{ fontSize: iconsize }}>
                  {item}
                </p>
              );

            return (
              <a
                onClick={() => changePage(linkitems[index])}
                className={
                  "nav-link flex-fill text-center container p-0 d-flex align-items-center justify-content-center"
                }
                href='#'
                key={item}
              >
                {navdisplay}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
