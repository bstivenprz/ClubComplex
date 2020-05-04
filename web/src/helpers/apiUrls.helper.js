export const API_HOST = `http://${process.env.HOST}:${process.env.SERVER_PORT}/`;

export const API_AUTHENTICATION_SIGNUP = API_HOST + 'authentication/signup';
export const API_AUTHENTICATION_LOGIN = API_HOST + 'authentication/login';
export const API_AUTHENTICATION_VERIFY_SESSION = API_HOST + 'authentication/verifySession';

export const API_PROJECTS_LIST = API_HOST + 'listProjects';
export const API_PROJECTS = API_HOST + 'projects';

export const API_USER_EDIT = API_HOST + 'users/edit';