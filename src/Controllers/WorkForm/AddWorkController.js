import path from 'path';
import fs from 'fs';
import Work from '../../Models/Work.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');

// Create a new work entry
export const createWork = async (req, res) => {
  try {
    const { workName, startDate, endDate, description, remarks } = req.body;

    const newWork = new Work({
      workName,
      startDate,
      endDate,
      description,
      remarks,
      image: req.files?.image?.[0]?.filename || '',
      video: req.files?.video?.[0]?.filename || '',
      docOrExcel: req.files?.docOrExcel?.[0]?.filename || '',
    });

    await newWork.save();
    res.status(201).json(newWork);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get all work entries
export const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
};

// Delete a work entry and its files
export const deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ message: 'Work entry not found' });

    // Delete uploaded files
    [work.image, work.video, work.docOrExcel].forEach((file) => {
      if (file) {
        const filePath = path.join(uploadDir, file);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });

    await Work.findByIdAndDelete(req.params.id);
    res.json({ message: 'Work entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// ✅ Update work entry
export const updateWork = async (req, res) => {
  try {
    const { workName, startDate, endDate, description, remarks } = req.body;

    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ message: 'Work not found' });

    // Update text fields
    work.workName = workName;
    work.startDate = startDate;
    work.endDate = endDate;
    work.description = description;
    work.remarks = remarks;

    const updateFileField = (field) => {
      if (req.files?.[field]?.[0]) {
        // Remove old file if exists
        const oldFile = work[field];
        if (oldFile) {
          const oldPath = path.join(uploadDir, oldFile);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        // Save new file name
        work[field] = req.files[field][0].filename;
      }
    };

    updateFileField('image');
    updateFileField('video');
    updateFileField('docOrExcel');

    const updatedWork = await work.save();

    // Add full file URLs for frontend
    const baseURL = `${req.protocol}://${req.get('host')}/uploads`;

    const responseData = {
      ...updatedWork.toObject(),
      image: updatedWork.image ? `${baseURL}/${updatedWork.image}` : null,
      video: updatedWork.video ? `${baseURL}/${updatedWork.video}` : null,
      docOrExcel: updatedWork.docOrExcel ? `${baseURL}/${updatedWork.docOrExcel}` : null,
    };

    res.json(responseData);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};
