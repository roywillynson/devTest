const bitmexService = require('../http/bitmex.service');
const httpStatus = require('http-status');
const { Announcement } = require('../models/announcement.model');

exports.getAnnouncement = async (req, res) => {
  // GET DATA FROM BITMEX
  const announcementsFromBitmex = await bitmexService.getAnnouncement();

  // STORE DATA FROM BITMEX
  Announcement.insertMany(
    announcementsFromBitmex.map(
      data =>
        new Announcement({
          content: data.content,
          date: data.date,
          id: data.id,
          link: data.link,
          title: data.title,
        })
    ),
    { ordered: true }
  );

  const announcements = await Announcement.find({}).lean();

  res.status(httpStatus.OK).json({ data: announcements });
};
