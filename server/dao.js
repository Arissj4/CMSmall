'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');
const { resolve } = require('path');
const { body } = require('express-validator');


function User(username, email,HASHEDPassword, salt, Role) {
    this.username = username;
    this.email = email;
    this.hashedPassword = HASHEDPassword;
    this.salt = salt;
    this.Role = Role;
}

// open the database
const db = new sqlite.Database('./DB/cmsdb.sqlite', (err) => {
    if (err) {
        throw err;
    }
})

// get all the users
exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const users = rows.map((e) => new User(e.username, e.email, e.Role));
            console.log(users);
            resolve(users);
        });
    });
};

// get a user by email and password for login
exports.getUser = (email, password) => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) { 
          reject(err); 
        }
        else if (row === undefined) { 
          resolve(false); 
        }
        else {
          const user = {username: row.username, email: row.email, role: row.role};
          crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
            if (err) reject(err);
            if(!crypto.timingSafeEqual(Buffer.from(row.HASHEDPassword, 'hex'), hashedPassword)) 
                resolve(false);
            else
                resolve(user);
          });
        }
      });
    });
};

// ------------------- Actions for pages -------------------

// Create a new page
exports.newPage = async (body) => {
    let cdate = body.creationdate;
    let pdate = body.publicationdate;
    if(pdate === " "){
        body.status = "Draft";
    }else if(cdate >= pdate){
        body.status = "Published";
    }else if(cdate < pdate){
        body.status = "Scheduled";
    }
    let pageid = await this.lastid();
    pageid = Number(pageid) + 1;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO pages(pageid, title, author, creationdate, status, publicationdate, content) VALUES(?,?,?,?,?,?,?)';
        db.run(sql, [pageid, body.title, body.username, body.creationdate, body.status, body.publicationdate, JSON.stringify(body.contents)], (err) => {
            if (err) {
                reject(err.message);
                return;
            }
            resolve("success");
        });
    });
};

// Update a page
exports.updatepage = (body) => {
    let cdate = body.creationdate;
    let pdate = body.publicationdate;
    if(pdate === " "){
        body.status = "Draft";
    }else if(cdate >= pdate){
        body.status = "Published";
    }else if(cdate < pdate){
        body.status = "Scheduled";
    }
    return new Promise((resolve, reject) => {
        const sql = 'update pages set title = ?, author = ?, status = ?, publicationdate = ?, content = ? where pageid = ?';
        db.run(sql, [body.title, body.author, body.status, body.publicationdate, JSON.stringify(body.contents), body.pageid], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("success");
        });
    });
};

// Delete a page
exports.delpage = (body) => {
    return new Promise((resolve, reject) => {
        const sql = 'delete from pages where pageid = ?';
        db.run(sql, [body.pageid], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("success");
        });
    });
};

// Get all pages
exports.getallpages = () => {
    return new Promise((resolve, reject) => {
        const sql = 'select * from pages';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const pages = rows.map((e) => e);
            resolve(pages);
        });
    });
};

// Get pages by username
exports.getpagesbyusername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'select * from pages where author = ?';
        db.all(sql, [username], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const pages = rows.map((e) => e);
            console.log(pages);
            resolve(pages);
        });
    });
};

// Get published pages
exports.getpublishedpages = () => {
    return new Promise((resolve, reject) => {
        const sql = 'select * from pages where status = "Published"';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const pages = rows.map((e) => e);
            resolve(pages);
        });
    });
};

// Get the last pageid
exports.lastid = () => {
    return new Promise((resolve, reject) => {
        let pageid = 0;
        const sql = 'SELECT * FROM pages ORDER BY pageid DESC LIMIT 1';
        db.get(sql, [], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row === undefined) {
                pageid = 0;
                resolve(pageid);
            }else{
                let id = row.pageid;
                resolve(id);
            }
        });
    });
};

// Get all pictures
exports.getPictures = () => {
    return new Promise((resolve, reject) => {
        const sql = 'select * from images';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const pictures = rows.map((e) => e);
            resolve(pictures);
        });
    });
};

// ------------------- Actions for Website -------------------

// Get website name
exports.getwebname = () => {
    return new Promise((resolve, reject) => {
        const sql = 'select webname from info';
        db.get(sql, [], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            const name = row.webname;
            resolve(name);
        });
    });
}

// Update website name
exports.updatewebname = (body) => {
    return new Promise((resolve, reject) => {
        const sql = 'update info set webname = ?';
        db.run(sql, [body.webname], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("success");
        });
    });
}