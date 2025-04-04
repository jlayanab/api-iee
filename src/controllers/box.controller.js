import Box from '../models/Boxes';
import Item from '../models/Items';
import User from '../models/User';
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

export const createBox = async (req, res) => {
    try {
        const { ident } = req.body
        const newBox = new Box({
            ident,
            Items: [],
            total: 0
        });

        const boxSave = await newBox.save()
        res.status(201).json(boxSave)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addItemToBox = async (req, res) => {
    try {
        const { boxId } = req.params;
        const { responsible, name, description, date, price,
            project, client, quotation, invoice, retencion, paid, datepaid, imgURL } = req.body;

        const box = await Box.findById(boxId);
        if (!box) return res.status(404).json({ error: "Caja no encontrada" + boxId });

        box.items.push({
            responsible, name, description, date, price,
            project, client, quotation, invoice, retencion, paid, datepaid, imgURL
        });
        box.total += price;

        await box.save();
        res.json(box);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Editar un item dentro de un box
exports.editItemInBox = async (req, res) => {
    try {
        const { boxId, itemId } = req.params;
        const { responsible, name, description, date, price,
            project, client, quotation, invoice, retencion, paid, datepaid, imgURL } = req.body;

        const box = await Box.findById(boxId);
        if (!box) return res.status(404).json({ error: "Registro no encontrado" });

        const item = box.items.id(itemId)
        if (!item) return res.status(400).json({ error: "Índice de item inválido" });

        // Actualizar datos del producto
        item.responsible = responsible || item.responsible
        item.description = description || item.description;
        item.name = name || item.name;
        item.price = price || item.price;
        item.date = date || item.date;
        item.project = project || item.project;
        item.client = client || item.client;
        item.quotation = quotation || item.quotation;
        item.invoice = invoice || item.invoice;
        item.retencion = retencion || item.retencion;
        item.paid = paid || item.paid;
        item.datepaid = datepaid || item.datepaid;
        item.imgURL = imgURL || item.imgURL;

        // Recalcular el total
        box.total = box.items.reduce((sum, p) => sum + p.price, 0);

        await box.save();
        res.json(box);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las facturas
export const getBoxes = async (req, res) => {
    const boxes = await Box.find();
    res.status(200).json({ status: "OK", data: boxes })
}

// Eliminar un producto dentro de una factura
exports.removeItemFromBox = async (req, res) => {
    try {
        const { boxId, itemId } = req.params;

        const box = await Box.findById(boxId);
        if (!box) return res.status(404).json({ error: "Registro no encontrado" });

        const item = box.items.id(itemId);
        if (!item) return res.status(400).json({ error: "Índice de item inválido" });

        // Restar el precio del total
        box.total -= item.price;

        // Eliminar el ítem con $pull y actualizar el total
        const result = await Box.findByIdAndUpdate(
            boxId,
            {
                $pull: { items: { _id: itemId } },
                total: box.total // Asegura que el total se actualice
            },
            { new: true }
        );

        if (!result) return res.status(500).json({ error: "No se pudo actualizar la caja" });

        console.log("Resultado de la eliminación:", result);
        res.json(result); // Enviar la respuesta con la caja actualizada

    } catch (error) {
        console.error("Error eliminando el ítem:", error);
        res.status(500).json({ error: error.message });
    }
};


export const getBoxById = async (req, res) => {
    const box = await Box.findById(req.params.boxId);
    res.status(200).json({ status: "OK", data: box })
}

export const deleteBoxById = async (req, res) => {
    const { boxId } = req.params
    await Box.findByIdAndDelete(boxId)
    res.status(204).json()
}

// Configuration constants
const MARGIN = 30;
const LANDSCAPE = 'landscape';
const FONT_HELVETICA = 'Helvetica';
const FONT_HELVETICA_BOLD = 'Helvetica-Bold';
const BASE_FONT_SIZE = 10;  // Reduced from 12 to 10 for better fit
const ITEM_FONT_SIZE = 9;
const LINE_COLOR = '#000000'; // Black color for lines

// Column configuration
const COLUMN_WIDTHS = [25, 70, 90, 140, 45, 55, 90, 70, 60, 60];
const HEADERS = ["#", "Responsable", "Nombre", "Descripción", "Fecha", "Precio", "Proyecto", "Cliente", "Cotización", "Factura"];
const NUM_COLUMNS = COLUMN_WIDTHS.length;

// Helper function to calculate column starting position
const calculateColumnPosition = (columnIndex) => {
    return MARGIN + COLUMN_WIDTHS.slice(0, columnIndex).reduce((a, b) => a + b, 0);
};



exports.generateBoxPDF = async (req, res) => {
    try {
        const { boxId } = req.params;

        // Buscar el box en la base de datos y ordenar los ítems por fecha
        const box = await Box.findById(boxId).populate("items");
        if (!box) return res.status(404).json({ error: "Box no encontrado" });

        box.items.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Crear el documento PDF con márgenes reducidos y orientación horizontal
        const doc = new PDFDocument({ margin: 30, layout: 'landscape' });
        const filePath = path.join(__dirname, `../../pdfs/box_${boxId}.pdf`);
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Encabezado del documento
        doc.fontSize(18).font("Helvetica-Bold").text(`Detalle del Box: ${box.ident}`, { align: "center" });
        doc.moveDown();
        doc.fontSize(12).font("Helvetica").text(`Descripción: ${box.description || "Sin descripción"}`);
        doc.text(`Fecha de Creación: ${new Date(box.createdAt).toLocaleDateString()}`);
        doc.moveDown(1);

        // Definir posiciones de columnas
        const startX = 30;
        const colWidths = [25, 70, 90, 140, 45, 55, 90, 70, 60, 60]; // Ancho de columnas

        // Dibujar encabezados
        let posY = doc.y;
        doc.font("Helvetica-Bold").fontSize(10);
        const headers = ["#", "Responsable", "Nombre", "Descripción", "Fecha", "Precio", "Proyecto", "Cliente", "Cotización", "Factura"];
        headers.forEach((header, i) => doc.text(header, startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), posY, { width: colWidths[i], align: "center" }));

        doc.moveDown(0.5);
        doc.moveTo(startX, doc.y).lineTo(750, doc.y).stroke(); // Línea separadora

        // Agregar detalles de los ítems
        doc.font("Helvetica").fontSize(9);
        posY = doc.y + 5;

        box.items.forEach((item, index) => {
            let rowHeight = 15; // Alto de fila base

            // Ajustar altura según descripción larga
            const descriptionHeight = doc.heightOfString(item.description || "-", { width: colWidths[3] });
            rowHeight = Math.max(rowHeight, descriptionHeight);

            // Calcular la posición vertical centrada
            const centeredPosY = posY + (rowHeight - 9) / 2; // 9 es el tamaño de la fuente

            // Dibujar los datos de la fila
            doc.text(`${index + 1}`, startX, centeredPosY, { width: colWidths[0], align: "center" });
            doc.text(item.responsible || "-", startX + colWidths[0], centeredPosY, { width: colWidths[1], align: "center" });
            doc.text(item.name || "-", startX + colWidths[0] + colWidths[1], centeredPosY, { width: colWidths[2], align: "center" });
            doc.text(item.description || "-", startX + colWidths[0] + colWidths[1] + colWidths[2], centeredPosY, { width: colWidths[3], align: "center" });
            doc.text(new Date(item.date).toLocaleDateString() || "-", startX + colWidths.slice(0, 4).reduce((a, b) => a + b, 0), centeredPosY, { width: colWidths[4], align: "center" });
            doc.text(`${item.price || 0} USD`, startX + colWidths.slice(0, 5).reduce((a, b) => a + b, 0), centeredPosY, { width: colWidths[5], align: "center" });
            doc.text(item.project || "-", startX + colWidths.slice(0, 6).reduce((a, b) => a + b, 0), centeredPosY, { width: colWidths[6], align: "center" });
            doc.text(item.client || "-", startX + colWidths.slice(0, 7).reduce((a, b) => a + b, 0), centeredPosY, { width: colWidths[7], align: "center" });
            doc.text(item.quotation || "-", startX + colWidths.slice(0, 8).reduce((a, b) => a + b, 0), centeredPosY, { width: colWidths[8], align: "center" });
            doc.text(item.invoice || "-", startX + colWidths.slice(0, 9).reduce((a, b) => a + b, 0), centeredPosY, { width: colWidths[9], align: "center" });

            posY += rowHeight + 5;
            doc.moveDown(0.5);
            doc.moveTo(startX, posY).lineTo(750, posY).stroke(); // Línea separadora
        });

        // Finalizar el documento
        doc.end();

        // Enviar el PDF para descarga
        stream.on("finish", () => {
            res.download(filePath, `box_${boxId}.pdf`, (err) => {
                if (err) console.error(err);
                fs.unlinkSync(filePath); // Eliminar el archivo después de la descarga
            });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
