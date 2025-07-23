import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/ui/Card';
import { CreateContentModel } from '../components/ui/CreateContentModel';
import { Sidebar } from '../components/ui/Sidebar';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

const [contents, setContents] = useState<Content[]>([]);


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
      setContents(res.data.content); // adjust if backend uses .data.contents or similar
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


  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
            fetchContents(); // refetch after adding new content
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setModelOpen(true);
            }}
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
                  {
                    share: true,
                  },
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
        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, title, _id }) => (
            <Card
              key={_id}
              type={type}
              link={link}
              title={title}
              contentId={_id}
              onDelete={() => handleDelete(_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
