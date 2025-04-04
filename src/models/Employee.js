import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    employeeId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    department: { type: String },
    position: { type: String },
    hireDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'user', 'employee'],
        default: 'user'
    },
    entryTime: { type: Date, default: Date.now },
    exitTime: { type: Date, default: Date.now },
    status: { type: String, default: 'Ingreso' },
},
    {
        timestamps: true,
        versionKey: false
    });

employeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para verificar contraseña
employeeSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default model('Employee', employeeSchema);