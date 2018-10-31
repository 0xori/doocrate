import { projectList } from './project-list';

import {
  CREATE_PROJECT_ERROR,
  CREATE_PROJECT_SUCCESS,
  REMOVE_PROJECT_ERROR,
  REMOVE_PROJECT_SUCCESS,
  LOAD_PROJECTS_SUCCESS,
  UNLOAD_PROJECTS_SUCCESS,
  UPDATE_PROJECT_ERROR,
  UPDATE_PROJECT_SUCCESS,
} from './action-types';
import { SELECT_PROJECT } from "./action-types";

export function createProject(projectId, project) {
  projectList.path = `projects`;
  return dispatch => {
    projectList.set(projectId,
      project)
      .catch(error => dispatch(createProjectError(error)));
  };
}

export function createProjectError(error) {
  return {
    type: CREATE_PROJECT_ERROR,
    payload: error
  };
}

export function createProjectSuccess(project) {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: project
  };
}

export function removeProject(project) {
  return dispatch => {
    projectList.remove(project.id)
      .catch(error => dispatch(removeProjectError(error)));
  };
}

export function removeProjectError(error) {
  return {
    type: REMOVE_PROJECT_ERROR,
    payload: error
  };
}

export function removeProjectSuccess(project) {
  return {
    type: REMOVE_PROJECT_SUCCESS,
    payload: project
  };
}

export function updateProjectError(error) {
  return {
    type: UPDATE_PROJECT_ERROR,
    payload: error
  };
}

export function updateProject(project, changes) {
  return dispatch => {
    projectList.update(project.id, changes)
      .catch(error => dispatch(updateProjectError(error)));
  };
}

export function updateProjectSuccess(project) {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: project
  };
}

export function loadProjectsSuccess(projects) {
  return {
    type: LOAD_PROJECTS_SUCCESS,
    payload: projects
  };
}

export function loadProjects() {
  return (dispatch, getState) => {
    projectList.path = `projects`;
    projectList.orderBy = {
      name: 'created',
      direction: 'asc'
    };

    projectList.subscribe(dispatch);
  };
}

export function unloadProjects() {
  projectList.unsubscribe();
  return {
    type: UNLOAD_PROJECTS_SUCCESS
  };
}

// Parse the /project parameter from the url
export function getProjectFromUrl() {
  const url = new URL(window.location.href);
  const urlSplitted = url.pathname.split('/');
  if(urlSplitted && urlSplitted.length > 1 && urlSplitted[1]) {
    //right after the first char
    return urlSplitted[1];
  }
  return null;
}

export function selectProject(project) {
  return {
    type: SELECT_PROJECT,
    payload: project
  };
}
