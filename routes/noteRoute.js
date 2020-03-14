const router=require('express').Router();
const { check,validationResult} = require('express-validator');

const Note = require('../models/Note');
const Authentication=require('../middleware/authenticate');


  // @route gett user/note
  // @desc Authentication & get token
  // @access Public
router.get('/note',Authentication,(req,res)=>{
    Note.find({noteuser:req.user._id})
    .then(note=>{
        res.send(note);
    })
    .catch(err=>{
        res.status(400).send('server Error');
    });
});




//@route post user/note
//@desc Authentication & get token
//@access Public
router.post('/note',
Authentication,
[

    check('websiteName', 'Please provide the website name').not().isEmpty(),
    check('websiteUrl', 'Please provide the website url').not().isEmpty(),
    check('websitePass', 'Please provide the website password').not().isEmpty()
],

(req,res)=>{
  const errors=validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({
            errors:errors.array()
          });
  }
  const{websiteName,websiteUrl,websitePass}=req.body;
  let note= new Note({
      noteuser:req.user._id,
      websiteName,
      websiteUrl,
      websitePass,
  })
 
  note.save()
  .then((result) => res.status(201).json({result,msg: 'Successfully Save'}))
  .catch(err=>{
    res.status(400).send('server Error line');
  });

});


// delete

router.delete('/delete/:id',Authentication,(req,res)=>{
  Note.findById(req.params.id)
  .then(note=>{
    if(!note){
      return res.status(404).json({msg:'Note not found'})
    }
    Note.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.send('Note remove')
    })
    .catch(err=>{
      res.status(400).send('server Error');
  })
  })
  .catch(err=>{
    res.status(400).send('server Error');
})
})


//update
router.put('/update/:id',Authentication,(req,res)=>{

  Note.findById(req.params.id)
  .then(result=>{
    if(!result){
      return res.status(404).json({msg:'Note not found'})
    }
    Note.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    .then((note)=>{
      res.status(201).json({note,msg: 'Successfully Update'})
    })
    .catch(err=>{
      res.status(400).send('server Error');
  })
  })
  .catch(err=>{
    res.status(400).send('server Error');
})

})
module.exports=router;