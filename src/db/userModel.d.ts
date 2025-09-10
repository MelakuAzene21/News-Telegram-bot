import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    chatId: string;
    subscribed: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    chatId: string;
    subscribed: boolean;
}, {}, mongoose.DefaultSchemaOptions> & {
    chatId: string;
    subscribed: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    chatId: string;
    subscribed: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    chatId: string;
    subscribed: boolean;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    chatId: string;
    subscribed: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=userModel.d.ts.map