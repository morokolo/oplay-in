angular.module('tangent')
  .directive('simpleProject', function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/projects/project-list-template.html'
    }
  })
  .directive('project', function(ProjectsModel){
    var controller = function() {
      var ctrl = this;

      ctrl.loading = false;

      ctrl.updateProject = function (projectId, project) {
        ctrl.loading = true;
        ProjectsModel.update(projectId, project)
          .then(function (result) {
            console.log('result', result);
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.loading = false;
          });
      };

      ctrl.deleteProject = function (projectId) {
        ctrl.remove({projectId:projectId});
      };
    };


  })
;