let Pagination = (props) => {
  let arr = [];
  for (let i = 1; i <= props.total; i++)arr.push(i);
  return (
    <nav>
      <ul class="pagination mt-4">
        {
          arr.map((el) => {
            return (
              <li
                onClick={() => {
                  props.selectTab(el);
                }
                }
                className={`page-item ${(el == props.currPage) ? "active" : ""}`}>
                <a className="page-link">
                  {el}
                </a>
              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};

export default Pagination;