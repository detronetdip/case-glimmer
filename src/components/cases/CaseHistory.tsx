
import { useState } from "react";
import { Case, Note, useCaseStore } from "@/store/useCaseStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bold, Italic, Link as LinkIcon, Underline } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CaseHistoryProps {
  caseData: Case;
}

const CaseHistory = ({ caseData }: CaseHistoryProps) => {
  const [noteText, setNoteText] = useState("");
  const { addNote } = useCaseStore();
  
  const handleAddNote = () => {
    if (!noteText.trim()) return;
    
    addNote(caseData.id, {
      text: noteText,
      addedBy: "admin user"
    });
    
    setNoteText("");
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4 border-b border-effectiv-border flex flex-row items-center justify-between">
        <h3 className="font-semibold">Case History</h3>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => {}}
        >
          <span className="sr-only">Expand</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {caseData.notes && caseData.notes.length > 0 ? (
            <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto px-4">
              {caseData.notes.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No history available</div>
          )}
          
          <div className="p-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Notes</h4>
              <div className="border border-input rounded-md">
                <Textarea
                  placeholder="Take notes here..."
                  className="min-h-24 resize-none border-0"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <div className="flex items-center justify-between border-t border-input p-2">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-effectiv-purple text-white text-xs">
                          A
                        </AvatarFallback>
                      </Avatar>
                      <span className="ml-2 text-xs text-gray-600">admin user</span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-effectiv-purple hover:bg-effectiv-lightPurple"
                      onClick={handleAddNote}
                      disabled={!noteText.trim()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <div>
                <select className="text-sm border border-input rounded-md px-2 py-1">
                  <option>Case status</option>
                  <option>Approve</option>
                  <option>Review</option>
                  <option>Reject</option>
                </select>
              </div>
              <div>
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button className="bg-effectiv-purple hover:bg-effectiv-lightPurple">Save</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
          <div className="font-medium">{note.date}</div>
        </div>
        <div className="text-sm text-gray-500">{note.time}</div>
      </div>
      <div className="ml-4">
        <div className="font-medium mb-1">Notes Added</div>
        <p className="text-sm whitespace-pre-wrap">{note.text}</p>
      </div>
      <div className="flex justify-end mt-1">
        <div className="flex items-center">
          <Avatar className="h-5 w-5 mr-1">
            <AvatarFallback className="bg-effectiv-purple text-white text-[10px]">
              A
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600">{note.addedBy}</span>
        </div>
      </div>
    </div>
  );
};

export default CaseHistory;
