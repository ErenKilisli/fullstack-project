// MongoDB için veritabanı işlemlerinde kullanmak üzere `MongoBlogModel` adında model oluşturalım.
// Mongoose adında ki kütüphaneyi ekle ve bu kütüphaneye erişmek için `mongoose` adını kullan.
// mongoose paketini sisteme dahil ediyoruz.
// Mongoose MongoDB ile bağlantı kurarken sağlıklı ve hızlı bağlantısı için  bir ODM(Object Data Modeling)
// NOT: Eğer bu sayfada Typescript kullansaydım reqire yerine import kullanacaktım.
// Import
// const mongoose = require("mongoose");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {  // 🔥 Burada firstname ve lastname yerine username kullanıyoruz
        type: String,
        required: true,
        trim: true,
        unique: true, // Kullanıcı adının benzersiz olmasını istiyorsanız
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Geçerli bir email giriniz"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Şifreyi kaydetmeden önce hash'le
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);





// // Schema adından (BlogPostSchema)
// const BlogRegisterSchema = new mongoose.Schema({
//         // 1.YOL (HEADER)
//         //header: String,

//         // 2.YOL (USERNAME)
//         username: {
//             type: String,
//             required: [true, " Username Başlığı için gereklidir"],
//             trim: true,
//             minleght: [5, "Username başlığı için minumum 5 karakter olmalıdır."],
//             maxleght: [100, "Username başlığı için maksimum 100 karakter olmalıdır."],
//         },

//         // PASSWORD
//         // content: String,
//         password: {
//             type: String,
//             required: [true, " Password içeriği için gereklidir"],
//             trim: true,
//             minleght: [5, "Password için minumum 5 karakter olmalıdır."],
//         },

//         // EMAIL
//         email: String,

//         // DATE
//         dateInformation: {
//             type: String, default: Date.now(),
//         },

//         // VIEWS
//         // Blog Görüntüleme (Default: 0)
//         views: {
//             type: Number, default: 0, min: [0, "Blog gösterimi için Negatif değer verilmez"],
//         },

//         // STATUS
//         // Durum (Proje için bu bir taslak mı yoksa canlı ortam için mi ?)
//         // Enum Durum Alanı: status: Blog gönderisinin durumu "draft" veya "published" olarak belirlenir. Bu, bir gönderinin taslak mı yoksa yayınlanmış mı olduğunu gösterir.
//         status: {
//             type: String, enum: ["draft", "published"], default: "draft",
//         },
//     }, //end BlogRegisterSchema {}
//     {
//         // Oluşturma ve güncellemem zamanları sisteme eklemek
//         // Zaman Bilgileri: timestamps: createdAt ve updatedAt alanları otomatik olarak eklenir ve her işlemde güncellenir.
//         timestamps: true,
//     }); //end PostSchema

// ////////////////////////////////////////////////////////////////////
// // Sanal alan (Virtuals) - İçerik özetini döndürme
// // summary: Blog içeriğinin ilk 100 karakterini döndüren bir sanal alan ekledik.
// // Bu, API cevaplarında sadece kısa bir özet göstermek için kullanılabilir.
// BlogRegisterSchema.virtual("summary").get(function () {
//     return this.content.substring(0, 100) + "..."; // İlk 100 karakter ve ardından ...
// });

// // Şema için ön middleware - Her kaydetmeden önce başlık ve içeriği büyük harflerle güncelleme
// // Şema Middleware (Pre-save Hook): pre("save"): Kaydedilmeden önce başlık ve içeriğin ilk harflerini büyük yapmak için bir ön middleware ekledik.
// BlogRegisterSchema.pre("save", function (next) {
//     this.header = this.header.charAt(0).toUpperCase() + this.header.slice(1);
//     this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1);
//     next();
// });

// // Statik metot - Belirli bir yazara ait tüm blogları bulma
// // Statik Metot: findByAuthor: Belirli bir yazara ait tüm blog gönderilerini bulmak için statik bir metot ekledik. Bu, belirli yazara göre blog filtrelemek için kullanılabilir.
// BlogRegisterSchema.statics.findByAuthor = function (authorName) {
//     return this.find({author: authorName});
// };

// // Instance metodu - Görüntüleme sayısını artırma
// // Instance Metot: incrementViews: Her blog gönderisine ait görüntüleme sayısını artırmak için bir instance metot ekledik. Bu, bir gönderi görüntülendiğinde görüntüleme sayısını artırmanızı sağlar.
// BlogRegisterSchema.methods.incrementViews = function () {
//     this.views += 1;
//     return this.save();
// };

// // Sanal alanların JSON'a dahil edilmesi
// BlogRegisterSchema.set("toJSON", {virtuals: true});

// // Module Exports modelName(BlogModel)
// // BlogModel modelini dışa aktarmak
// // Post kullanımı daha yaygındır
// // module.exports = mongoose.model('Post', BlogRegisterSchema );

// // Module
// // 1.YOL
// // module.exports = mongoose.model("MongoBlogModel", BlogRegisterSchema);

// // 2.YOL
// const Blog = mongoose.model("MongoBlogRegisterModel", BlogRegisterSchema);
// module.exports = Blog;
