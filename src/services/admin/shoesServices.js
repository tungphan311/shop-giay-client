import API from "utils/Axios";
import qs from "query-string";

export async function getAllShoes({ pageSize, page, filter, token }) {
  const query = qs.stringify({ "page-size": pageSize, page });
  if (!pageSize || !page) {
    return await API.get(`/admin/shoes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    if (filter) {
      let f = "";
      for (var key in filter) {
        f += `&${key}=${filter[key]}`;
      }

      return await API.get(`/admin/shoes?${query}${f}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      return await API.get(`/admin/shoes?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }
}

export async function getProviders({ token }) {
  return await API.get("/admin/provider", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function addProviders({ name, token }) {
  return await API.post(
    "/admin/provider",
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export async function getColors({ token }) {
  return await API.get("/admin/color", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function addColor({ name, token }) {
  return await API.post(
    "/admin/color",
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export async function getSizes({ token }) {
  return await API.get("/admin/size", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function addSize({ name, token }) {
  return await API.post(
    "/admin/size",
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function getGenders({ token }) {
  return await API.get("/admin/gender", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getShoesType({ token }) {
  return await API.get("/admin/shoestype", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getShoesBrand({ token }) {
  return await API.get("/admin/shoesbrand", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getShoesById({ id, token }) {
  return await API.get(`/admin/shoes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function editShoes({
  id,
  name,
  code,
  price,
  images,
  stocks,
  genderId,
  brandId,
  styleId,
  description,
  token,
}) {
  return await API.put(
    `/admin/shoes/${id}`,
    {
      name,
      code,
      price,
      images,
      stocks,
      genderId,
      brandId,
      styleId,
      description,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function addShoes({
  name,
  code,
  price,
  images,
  stocks,
  genderId,
  brandId,
  styleId,
  description,
  token,
}) {
  return await API.post(
    "/admin/shoes",
    {
      name,
      code,
      price,
      images,
      stocks,
      genderId,
      brandId,
      styleId,
      description,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function deleteShoes({ ids, token }) {
  let query = "";
  for (let i = 0; i < ids.length; i++) {
    query += `ids=${ids[i]}`;
    query += i === ids.length - 1 ? "" : "&";
  }
  return await API.delete(`/admin/shoes?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
