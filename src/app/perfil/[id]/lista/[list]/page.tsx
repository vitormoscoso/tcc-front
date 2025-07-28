"use client";

import { getList } from "@/services/lists/listService";
import { BookDetails } from "@/types/book";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListPage() {
  const { id, list } = useParams();

  const [listData, setListData] = useState<BookDetails[] | null>(null);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await getList(id as string, list as string);
        console.log("List Data:", response);
        setListData(response);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchListData();
  }, [id, list]);

  return (
    <div className="pt-10 px-26">
      <div className="bg-[#3A6EA5] text-white rounded-lg p-6 flex flex-wrap gap-8">
        {listData?.length === 0 && (
          <div className="w-full text-center">Nenhum livro encontrado.</div>
        )}
        {listData?.map((book) => (
          <div key={book?.id} className="flex items-start gap-4">
            {/* Capa */}
            <img
              src={book?.coverUrl}
              alt={book?.title}
              className="w-24 h-36 object-cover rounded-sm"
            />

            {/* Conteúdo */}
            <div className="flex flex-col justify-between flex-1 space-y-2">
              <div>
                <h2 className="text-lg font-bold">{book?.title}</h2>
                <p className="text-sm">
                  {book?.authors?.length > 0
                    ? book?.authors.map((a) => a.name).join(", ")
                    : "-"}
                </p>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <span>{book?.publishDate || "-"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
