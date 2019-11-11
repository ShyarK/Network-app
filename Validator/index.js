const Joi = require('@hapi/joi');

function Validator() {
  const validateUserRegistration = function(user) {
    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,10}$/)
        .required(),

      repeat_password: Joi.ref('password'),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required(),
    });
    return schema.validate(user);
  };

  const validateUserLogin = function(user) {
    const schema = Joi.object({
      password: Joi.string().exist(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required(),
    });
    return schema.validate(user);
  };

  const validateUserProfile = function(profile) {
    const schema = Joi.object({
      status: Joi.string()
        .empty('')
        .required(),
      skills: Joi.string()
        .empty('')
        .required(),
      company: Joi.string(),
      website: Joi.string(),
      location: Joi.string(),
      bio: Joi.string(),
      githubusername: Joi.string(),
      youtube: Joi.string(),
      facebook: Joi.string(),
      twitter: Joi.string(),
      instagram: Joi.string(),
      linkedin: Joi.string(),
    });
    return schema.validate(profile);
  };

  const validateUserExperience = function(exp) {
    const schema = Joi.object({
      title: Joi.string()
        .empty('')
        .required(),
      company: Joi.string()
        .empty('')
        .required(),
      location: Joi.string(),
      from: Joi.date().required(),
      to: Joi.string(),
      current: Joi.boolean(),
      description: Joi.string(),
    });
    return schema.validate(exp);
  };

  const validateUserEducation = function(education) {
    const schema = Joi.object({
      school: Joi.string()
        .empty('')
        .required(),
      degree: Joi.string()
        .empty('')
        .required(),
      fieldOfStudy: Joi.string()
        .empty('')
        .required(),
      from: Joi.date().required(),
      to: Joi.string(),
      current: Joi.boolean(),
      description: Joi.string(),
    });
    return schema.validate(education);
  };

  const validateUserPost = function(post) {
    const schema = Joi.object({
      text: Joi.string()
        .empty('')
        .required(),
    });
    return schema.validate(post);
  };

  this.userRegistrationValidator = function(req, res, next) {
    const { error } = validateUserRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else next();
  };
  this.userLoginValidator = function(req, res, next) {
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else next();
  };

  this.userProfileValidator = function(req, res, next) {
    const { error } = validateUserProfile(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else next();
  };
  this.userExperienceValidator = function(req, res, next) {
    const { error } = validateUserExperience(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else next();
  };
  this.userEducationValidator = function(req, res, next) {
    const { error } = validateUserEducation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else next();
  };

  this.userPostValidator = function(req, res, next) {
    const { error } = validateUserPost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else next();
  };
}
module.exports = Validator;
