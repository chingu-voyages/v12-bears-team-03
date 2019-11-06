const {google} = require('googleapis');

exports.getFolder = (req, res, next) => {
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/drive.readonly'];
    
};