'use strict';

angular.module('tangent')
  .controller('ProjectsCtrl', function ( ProjectsModel,$scope, $cookies) {
    var ctrl = this;

    ctrl.loading = false;

    ctrl.newProject = {
      title: '',
      description: '',
      isPublic: false
    };

    ctrl.resetForm = function () {
      ctrl.loading = false;
      ctrl.newProject = {
        title: '',
        description: '',
        isPublic: false
      };
    };

    ctrl.getProjects = function () {
      ProjectsModel.all()
        .then(function (result) {
          ctrl.projects = (result !== 'null') ? result : {};
        }, function () {
          ctrl.resetForm();
        });
    };

    ctrl.createProject = function (project, isValid) {
      if (isValid) {
        ctrl.loading = true;

        ProjectsModel.create(project)
          .then(function (result) {
            ctrl.getProjects();
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.resetForm();
          });
      }
    };

    ctrl.updateProject = function (projectId, project, isValid) {
      if (isValid) {
        ctrl.loading = true;
        ProjectsModel.update(projectId, project)
          .then(function (result) {
            ctrl.getProjects();
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.cancelEditing();
          });
      }
    };

    ctrl.deleteProject = function (projectId) {
      console.log(projectId);
      ProjectsModel.destroy(projectId)
        .then(function (result) {
          ctrl.getProjects();
        })
        .catch(function (reason) {
          //
        })
        .finally(function () {
          ctrl.cancelEditing();
        });
    };

    ctrl.setEditedProject = function (projectId, project) {
      ctrl.editedProjectId = projectId;
      ctrl.editedProject = angular.copy(project);
      ctrl.isEditing = true;
    };

    ctrl.isCurrentProject = function (projectId) {
      return ctrl.editedProject !== null && ctrl.editedProjectId === projectId;
    };

    ctrl.cancelEditing = function () {
      ctrl.loading = false;
      ctrl.editedProjectId = null;
      ctrl.editedProject = null;
      ctrl.isEditing = false;
    };

   

    ctrl.getProjects();
  });

