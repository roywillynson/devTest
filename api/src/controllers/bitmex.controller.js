const bitmexService = require('../http/bitmex.service');
const httpStatus = require('http-status');
const { Announcement } = require('../models/announcement.model');

exports.getAnnouncement = async (req, res) => {
  // GET DATA FROM BIMEX
  const announcements = await bitmexService.getAnnouncement();

  // STORE DATA FROM BIMEX
  Announcement.insertMany(
    announcements.map(
      data =>
        new Announcement({
          content: data.content,
          date: data.date,
          id: data.id,
          link: data.link,
          title: data.title,
        })
    )
  );

  res.status(httpStatus.OK).json({ data: announcements });
};
