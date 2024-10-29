const { DataTypes } = require('sequelize');
const sequelize = require('../database/connectToDB');

// Comment Model
const Comment = sequelize.define('Comments', {
    formId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Forms', key: 'id' },
        onDelete: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    timestamps: true
});

// Filled Form Model
const FilledForm = sequelize.define('FilledForms', {
    formId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Forms',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

// Filled Form Items Model
const FilledFormItem = sequelize.define('FilledFormItems', {
    filledFormId:{
        type: DataTypes.INTEGER,
        references: {
            model: 'FilledForms',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    question:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    answer:{
        type: DataTypes.STRING
    }
})

// Form Model
const Form = sequelize.define('Forms', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Title is required' } }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: { msg: 'Description is required' } }
    },
    imageUrl: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        },
        allowNull: true,
        defaultValue: null,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    topicId:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Topics',
            key: 'id',
        }
    }
})
// Form Field Model
const FormField = sequelize.define('FormFields', {
    formId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Forms',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('text', 'textarea', 'boolean', 'select'),
        allowNull: false,
    },
    options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: null,
    },
    hidden:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})

// Like Model
const Like = sequelize.define('Tags', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});

// Tag Model
const Tag = sequelize.define('Tags', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,  // Mark it as the primary key
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Topic Model
const Topic = sequelize.define('Topics', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// User Model
const User = sequelize.define("Users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please enter a valid email address.'
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user','admin'),
        allowNull: false,
        defaultValue: 'user',
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})


// Models Assosiations
Form.hasMany(Comment, { 
    foreignKey: 'formId', 
    as: 'form_comment'
});
Comment.belongsTo(Form, { 
    foreignKey: 'formId', as: 'comment_form'
});

User.hasMany(Comment, { 
    foreignKey: 'userId', as: 'user_comment'
});
Comment.belongsTo(User, { 
    foreignKey: 'userId', as: 'comment_user'
});

FilledForm.hasMany(FilledFormItem, { 
    foreignKey: 'filledFormId', as: 'filledForm_filledFormItem'
});
FilledFormItem.belongsTo(FilledForm, { 
    foreignKey: 'filledFormId', as: 'filledFormItem_filledForm'
});

User.hasMany(FilledForm, { 
    foreignKey: 'userId', as: 'user_filledForm'
});
FilledForm.belongsTo(User, { 
    foreignKey: 'userId', as: 'filledForm_user'
});

Form.hasMany(FilledForm, { 
    foreignKey: 'formId', as:'form_filledForm'
});
FilledForm.belongsTo(Form, {
    foreignKey: 'formId', as:"filledForm_form"
});

Topic.hasMany(Form, {
    foreignKey: 'topicId', as: 'topic_form'
});
Form.belongsTo(Topic, {
    foreignKey: 'topicId', as: 'form_topic'
});

User.hasMany(Form, {
    foreignKey: 'userId', as: 'user_form'
});
Form.belongsTo(User, {
    foreignKey: 'userId', as: 'form_user'
});

Form.hasMany(FormField, { 
    foreignKey: 'formId', as: 'form_formField'
});
FormField.belongsTo(Form, { 
    foreignKey: 'formId', as: 'formField_form'
});

module.exports = {Comment, FilledForm, FilledFormItem, Form, FormField, Like, Tag, Topic, User}