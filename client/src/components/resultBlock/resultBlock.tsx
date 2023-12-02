import React from "react";
import { User } from "../searchForm/searchForm";
import './resultBlock.css'
import { Preloader } from "../preloader/preloader";

const ResultBlock: React.FC<{ data: User[] | null, loading: boolean, errorMessage: string
}> = ({ data, loading, errorMessage }) => {
  return (
    <>
      {loading && <Preloader /> }
      {data?.length !== 0 ?
        (
          <ul className="list">{data?.map(user => 
            <li key={user.number} className="list__item">
              <p>{user.email}</p>
              <p>{user.number}</p>
            </li>
          )}
          </ul>
        ) : 
        (
          <div>
            Нет данных
          </div>
        )
      }
      {errorMessage && <p className="error__message">{errorMessage}</p>}
    </>
  )
}

export default ResultBlock
