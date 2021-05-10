import React, { useContext, useEffect, Fragment } from 'react';
import { GithubContext } from '../context/github/githubContext';
import { Link } from 'react-router-dom';
import { Repos } from '../components/Repos';

export const Profile = ({ match }) => {
  const { getUser, getRepos, loading, user, repos } = useContext(GithubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p className="text-center">Загрузка...</p>;
  }

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user;

  return (
    <Fragment>
      <Link to="/" className="link-primary">
        Back to Main Page
      </Link>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img src={avatar_url} alt={name} style={{ width: '150px' }} />
              <h1>{name}</h1>
              {location && <p>Location: {location}</p>}
            </div>
            <div className="col">
              {bio && (
                <Fragment>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <ul>
                {login && (
                  <li>
                    <strong>Username: </strong> {login}
                  </li>
                )}

                {company && (
                  <li>
                    <strong>Company: </strong> {company}
                  </li>
                )}

                {blog && (
                  <li>
                    <strong>Website: </strong> {blog}
                  </li>
                )}
              </ul>

              <div className={'badge alert-primary ms-2'}>
                Subscribers: {followers}
              </div>
              <div className={'badge alert-success ms-2'}>
                Subscribed: {following}
              </div>
              <div className={'badge alert-info ms-2'}>
                Repos: {public_repos}
              </div>
              <div className={'badge alert-dark ms-2'}>
                Gists: {public_gists}
              </div>
              <div>
                <a
                  href={html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark mt-5"
                >
                  Open Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};
