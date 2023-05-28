//
//const db = require('./config/mongoose')
const TodoLists = require('../models/todo_list')
// function for redirecting to main home page

module.exports.home = function(req, res) {
    // Fetching using Mongoose
    TodoLists.find({})
      .then(todo => {
        return res.render('homePage', {
          title: 'TaskBuddy',
          todoList: todo
        });
      })
      .catch(err => {
        console.log('Error in fetching data:', err);
        return res.status(500).send('Internal Server Error');
      });
  };
  
// function for new Data
function DateValeu(dueDate){
    let months = ['jan','feb','mar','Apr','May','june','july','aug','sept','oct','nov','dec'] // static value for implementing monthe value


    newdate = '';
    let monapp = '';
    // checking months 
    if(dueDate[1] == '01'){
        monapp=months[0];
    }
    else if(dueDate[1] == '02'){
        monapp=months[1];
    }else if(dueDate[1] == '03'){
        monapp=months[2];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '05'){
        monapp=months[4];
    }else if(dueDate[1] == '06'){
        monapp=months[5];
    }else if(dueDate[1] == '07'){
        monapp=months[6];
    }else if(dueDate[1] == '08'){
        monapp=months[7];
    }else if(dueDate[1] == '09'){
        monapp=months[8];
    }else if(dueDate[1] == '10'){
        monapp=months[9];
    }else if(dueDate[1] == '11'){
        monapp=months[10];
    }else if(dueDate[1] == '12'){
        monapp=months[11];
    }
    newdate =dueDate[2]+'-'+monapp+'-'+dueDate[0] // displaying date in dd-mm-yyyy formate
    return newdate;
}

// function for creating toto list

module.exports.createTodo = async function(req, res) {
    try {
      const dueDate = req.body.dateValue.split('-');
      const newdate = DateValeu(dueDate);
  
      const newArr = await TodoLists.create({
        desc: req.body.desc,
        category: req.body.category,
        dueDate: newdate
      });
  
      return res.redirect('/');
    } catch (err) {
      console.log('Oops, an error occurred:', err);
      return res.status(500).send('Internal Server Error');
    }
  };
  
// function for deleting todo list

module.exports.deleteTodo = async function(req, res) {
    try {
      const sp = req.query.id; // getting the id from the UI
      const newsp = sp.split(',');
  
      // Looping over newsp to delete all the checked values
      for (let i = 0; i < newsp.length; i++) {
        await TodoLists.findByIdAndDelete(newsp[i]);
      }
  
      return res.redirect('/');
    } catch (err) {
      console.log('Error:', err);
      return res.status(500).send('Internal Server Error');
    }
  };
  
// function for fetching data for edit page
module.exports.EditPage = async function(req, res) {
  try {
    const todoLists = await TodoLists.findById(req.query.id);

    return res.render('editPage', {
      title: 'Edit Page',
      todolist: todoLists
    });
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
};

// function for updatind tada after the todo is being edited
module.exports.editDetails = function(req,res){
    dueDate =req.body.dueDate.split('-'); // splitting date and taking montha value
    let newdate='';
    newdate= DateValeu(dueDate);     
     TodoLists.updateOne({_id:req.query.id},{$set:{desc:req.body.desc,category:req.body.category,dueDate:newdate}} ,function(err,todoData){
        if(err){console.log('erroe while updating'); return}
        return res.redirect('/')
    })
}

