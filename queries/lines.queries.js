const Line = require("../database/models/line.model");

exports.getOneLine = (lineId) => {
  return Line.findOne({ id: lineId }).exec();
};

exports.getLineBySku = (sku) => {
  return Line.findOne({ sku: sku }).exec();
};
exports.getAllLines = () => {
  return Line.find({}).exec();
};

exports.createLine = (line) => {
  const newLine = new Line(line);
  return newLine.save();
};

exports.deleteLine = (lineId) => {
  return Line.findByIdAndDelete(lineId).exec();
};

exports.updateLine = (lineId, line) => {
  return Line.findByIdAndUpdate(
    lineId,
    { $set: line },
    { runValidators: true }
  );
};

exports.clearAllLines = () => {
  return Line.deleteMany({}).exec();
};
