import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/ui/Card';
import { CreateContentModel } from '../components/ui/CreateContentModel';
import { Sidebar } from '../components/ui/Sidebar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Microlink from '@microlink/react';

const raw = localStorage.getItem("user");
const user = raw ? JSON.parse(raw) : undefined;

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Content | null>(null);

  interface Content {
    _id: string;
    title: string;
    link: string;
    type: "youtube" | "twitter" | "document" | "links";
  }

  const [contents, setContents] = useState<Content[]>([]);
  const [selectedType, setSelectedType] = useState<"twitter" | "youtube" | "document" | "links">("twitter");

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setContents(res.data.content);
    } catch (err) {
      console.error('Failed to fetch contents', err);
    }
  };

  const handleDelete = async (contentId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setContents(prev => prev.filter(item => item._id !== contentId));
    } catch (err) {
      console.error("Failed to delete content", err);
      alert("Error deleting content");
    }
  };

  // Reload Twitter embed when modal opens
  useEffect(() => {
    if (selectedCard?.type === "twitter" && (window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }, [selectedCard]);

  const filteredContents = contents.filter(content => content.type === selectedType);

  return (
    <div>
      <Sidebar selectedType={selectedType} onSelectType={setSelectedType} user={user} />
      
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
            fetchContents();
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModelOpen(true)}
            startIcon={<PlusIcon size="lg" />}
            variant="primary"
            text="Add content"
            size="md"
          />
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: localStorage.getItem('token'),
                    },
                  }
                );
                const url = `http://localhost:5173/share/${response.data.hash}`;
                alert(url);
              } catch (error: any) {
                console.error('Failed to share brain:', error);
                alert('Could not generate shareable link. Please try again.');
              }
            }}
            startIcon={<ShareIcon size="lg" />}
            variant="secondary"
            text="Share Brain"
            size="md"
          />
        </div>

        <div className="flex gap-6 flex-wrap">
          {filteredContents.map(({ type, link, title, _id }) => (
            <Card
              key={_id}
              type={type}
              link={link}
              title={title}
              contentId={_id}
              onDelete={() => handleDelete(_id)}
              onClick={() => setSelectedCard({ _id, title, link, type })}
            />
          ))}
        </div>

        {/* Big card modal */}
        {selectedCard && (
          <div className="fixed inset-0 backdrop-blur-sm bg-transparent  flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full h-[80vh] overflow-y-auto relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl cursor-pointer"
                onClick={() => setSelectedCard(null)}
              >
                ×
              </button>
              <h2 className="text-xl flex justify-center font-semibold mb-4">{selectedCard.title}</h2>

              {selectedCard.type === "youtube" && (
                <iframe
                  className="w-full h-[470px] rounded-md pl-5 pr-5"
                  src={selectedCard.link.replace("watch", "embed").replace("?v=", "/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}

              {selectedCard.type === "twitter" && (
                <div className="flex justify-center">
                <blockquote className="twitter-tweet w-full">
                  <a href={selectedCard.link.replace("x.com", "twitter.com")}></a>
                </blockquote>
                </div>
              )}

              {selectedCard.type === "document" && (
                
                <p className="whitespace-pre-line text-gray-800 mt-2">{selectedCard.link}</p>
                
              )}

             {selectedCard.type === "links" && (
              <div className="w-full h-[470px]">
                    <div className="w-full h-full block">
                    <Microlink
                      url={selectedCard.link}
                      size="large"
                      style={{ height: "100%" ,maxWidth: "100%"}}
                    />
                    </div>
            </div>
            )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
