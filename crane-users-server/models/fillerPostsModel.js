import { dbneon } from "../config/db.js";

export const addPost = async (
  user_id,
  start_date,
  end_date,
  work_hours,
  place,
  certification_needed,
  crane_type,
  payment,
  extra_comments
) => {
  const trx = await dbneon.transaction();
  try {
    const [post] = await trx("filler_posts").insert(
      {
        user_id,
        start_date,
        end_date,
        work_hours,
        place,
        certification_needed,
        crane_type,
        payment,
        extra_comments,
      },
      [
        "post_id",
        "user_id",
        "start_date",
        "end_date",
        "work_hours",
        "place",
        "certification_needed",
        "crane_type",
        "payment",
        "extra_comments",
        "is_filler_found"
      ]
    );

    await trx.commit();
  } catch (err) {
    await trx.rollback();
    console.log("the error=", err);
    throw err;
  }
};

export const removePostById = async (post_id) => {
  const trx = await dbneon.transaction();
  try {
    const deletedCount = await trx("filler_posts")
      .where({ post_id })
      .del();

    if (deletedCount === 0) {
        console.log(`Attempted to delete post_id ${post_id}, but no row was affected.`);
    }
    await trx.commit();
    console.log(`Post with ID ${post_id} successfully removed.`);

  } catch (err) {
    await trx.rollback();
    console.log("Error removing post:", err);
    throw err;
  }
};

export const getPostsByUserId = async (id) => {
  try {
    const posts = await dbneon("filler_posts")
      .select(
        "post_id",
        "user_id",
        "start_date",
        "end_date",
        "work_hours",
        "place",
        "certification_needed",
        "crane_type",
        "payment",
        "extra_comments",
        "is_filler_found"
      )
      .where({ user_id: id });
    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPostsBycertificete = async (certificete) => {
  try {
    const posts = await dbneon("filler_posts")
      .select(
        "post_id",
        "user_id",
        "start_date",
        "end_date",
        "work_hours",
        "place",
        "certification_needed",
        "crane_type",
        "payment",
        "extra_comments",
        "is_filler_found"
      )
      .where({ certification_needed: certificete });
    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPostsByDate = async (date) => {
  try {
    const posts = await dbneon("filler_posts")
      .select(
        "post_id",
        "user_id",
        "start_date",
        "end_date",
        "work_hours",
        "place",
        "certification_needed",
        "crane_type",
        "payment",
        "extra_comments",
        "is_filler_found"
      )
      .where({ start_date: date });
    return posts;
  } catch (error) {
    throw error;
  }
};


// export const getLicenseByUserID = async (id) => {
//   try {
//     const userWithLicense = await dbneon("users")
//       .select(
//         "licenses.licenses_id",
//         "licenses.user_id",
//         "licenses.license_number",
//         "licenses.certification",
//         "licenses.license_max_load",
//         "licenses.start_date",
//         "licenses.end_date"
//       )
//       .leftJoin("licenses", "users.id", "licenses.user_id")
//       .where("users.id", id)
//       .first();

//     return userWithLicense;
//   } catch (error) {
//     throw error;
//   }
// };

export const getAllfillerPosts = async () => {
  try {
    const posts = await dbneon("filler_posts").select(
      "post_id",
        "user_id",
        "start_date",
        "end_date",
        "work_hours",
        "place",
        "certification_needed",
        "crane_type",
        "payment",
        "extra_comments",
        "is_filler_found"
    );
    return posts;
  } catch (error) {
    throw error;
  }
};
