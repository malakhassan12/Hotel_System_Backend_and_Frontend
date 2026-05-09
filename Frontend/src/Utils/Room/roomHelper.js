export const buildFormData = (values, files, existingImages = []) => {
  //   const formData = new FormData();

  //   Object.keys(values).forEach((key) => {
  //     if (key !== "images") {
  //       const value =
  //         typeof values[key] === "boolean"
  //           ? String(values[key])
  //           : values[key];

  //       formData.append(key, value);
  //     }
  //   });

  //   // ✅ send existing image IDs
  //   existingImages.forEach((img) => {
  //     formData.append("existingImages", img.id);
  //   });

  //   // ✅ send new files
  //   files.forEach((file) => {
  //     formData.append("images", file);
  //   });

  //   return formData;

  // const formData = new FormData();

  //   Object.keys(values).forEach((key) => {
  //     // هنتجاهل الصور والـ existingImages عشان هنضيفهم بشكل خاص تحت
  //     if (key !== "images" && key !== "existingImages" && key !== "Images") {
  //       formData.append(key, values[key]);
  //     }
  //   });

  //   // 2. ✅ إضافة الصور الجديدة (الملفات)
  //   if (files && files.length > 0) {
  //     files.forEach((file) => {
  //       // لازم نتأكد إننا بنضيف ملف حقيقي (File Object)
  //       if (file instanceof File) {
  //         formData.append("images", file);
  //       }
  //     });
  //   }

  //   // 3. ✅ حل مشكلة [object Object] (الصور القديمة)
  //   // الصورة image_0d9478.png بتقول إنك بتبعت الـ Object كامل، إحنا محتاجين الـ ID بس
  //   if (existingImages && existingImages.length > 0) {
  //     existingImages.forEach((img) => {
  //       // لو الـ img عبارة عن Object، خد منه الـ id.. لو هو أصلاً رقم خده زي ما هو
  //       const idToSend = (img && typeof img === 'object') ? img.id : img;

  //       if (idToSend) {
  //         formData.append("existingImages", idToSend);
  //         // 💡 ملاحظة: يفضل تخلي الاسم "existingImages" في الـ Backend برضه
  //       }
  //     });
  //   }

  //   return formData;

  const formData = new FormData();

  // 1. إضافة البيانات النصية (roomNumber, description, etc.)
  Object.keys(values).forEach((key) => {
    // 1. ✅ لو الحقل هو 'id' وقيمته null أو نص "null" (حالة الإضافة)، تجاهله تماماً
    if (
      key === "id" &&
      (values[key] === null || values[key] === "null" || values[key] === "")
    ) {
      return;
    }
    if (key !== "images" && key !== "existingImages") {
      formData.append(key, values[key]);
    }
  });

  // 2. إضافة الصور الجديدة فقط كملفات (Files)
  files.forEach((file) => {
    if (file instanceof File) {
      formData.append("images", file);
    }
  });

  // 3. إضافة الـ IDs الخاصة بالصور اللي لسه موجودة (المستخدم ممسحهاش من الـ UI)
  existingImages.forEach((img) => {
    const idToSend = img.id ? img.id : img;
    formData.append("existingImages", idToSend);
  });

  return formData;
};
