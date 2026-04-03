import SavedJob from '../models/SavedJob.js';

//@desc Save a job
export const saveJob = async(req, res) =>{
   try{
     const exist = await SavedJob.findOne({ job: req.params.jobId, jobseeker : req.user._id});
     if(exist)
        return res.status(400).json({message : "job already saved "});
     
     const saved = await SavedJob.create({ job: req.params.jobId, jobseeker : req.user._id});
     res.status(201).json(saved);
    }catch(err){
        res.status(500).json({ message : "Failed to save job " ,error : err.message });
    }
}

//@desc Unsave a job
export const unsaveJob = async(req, res) => {
    try{
      const job = await SavedJob.findOne({ job: req.params.jobId, jobseeker : req.user._id});
      if (!job) return res.status(404).json({ message : "job doesn't exist"});
      await SavedJob.deleteOne(job);
      res.status(204).json({ message : "you are unsave job"});

    }catch(err){
        res.status(500).json({message: "Failed to remove job " ,message : err.message });
    }
};

//@desc Get saved jobs for current 
export const getSavedJobs = async(req ,res) => {
    try{
        const savedJobs =  await SavedJob.find({ jobseeker : req.user_id})
         .populate({
            path: "job",
            polpulate : {
                path : "company",
                select : "name companyName companyLogo",
            },
         });
         res.json(savedJobs);

    }catch(err){
        res.status(500).json({message: "Failed to get saved jobs" ,message : err.message })
    }
}
    