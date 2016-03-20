/* jshint asi:true */

var schedule = [{
      title: 'Meet Adrian at 6pm',
      details: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      done: true
    }, {
      title: 'Chat with V.Kudinov',
      details: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
      done: false
    }, {
      title: 'Watch Iron Man',
      details: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.',
      done: false
    }, {
      title: 'Fix bug on a Website',
      details: 'Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.',
      done: false
    }]

var demo = new Vue({
  el: '.todo',
  data: {
    query: '',
    tasks: schedule,
    editing: false
  },
  methods: {
    addTask: function() {
      this.editing = true
      this.tasks.unshift({
        title: '',
        details: '',
        lastTitle: '',
        lastDetails: '',
        done: false,
        editing: true
      })
    },
    toggleStatus: function(task) {
      task.done = !task.done
    },
    editTask: function(task) {
      this.editing = true
      Vue.set(task, 'editing', true)
      Vue.set(task, 'lastTitle', task.title)
      Vue.set(task, 'lastDetails',  task.details)
    },
    deleteTask: function(task) {
      var index = this.tasks.indexOf(task)
      this.tasks.splice(index, 1)
    },
    increasePriority: function(task) {
      var index = this.tasks.indexOf(task)
      if (index === 0) {
        return
      }
      var previous = this.tasks[index - 1]
      this.tasks.$set(index - 1, task)
      this.tasks.$set(index, previous)
    },
    decreasePriority: function(task) {
      var index = this.tasks.indexOf(task)
      if (index === this.tasks.length - 1) {
        return
      }
      var next = this.tasks[index + 1]
      this.tasks.$set(index + 1, task)
      this.tasks.$set(index, next)
    },
    cancelEdit: function(task) {
      if (task.lastTitle === '' || task.lastDetails === '') {
        this.deleteTask(task)
        this.editing = false
        return
      }
      task.title = task.lastTitle
      task.details = task.lastDetails
      task.editing = this.editing = false
    },
    saveEdit: function(task) {
      task.editing = this.editing = false
    }
  }
})
