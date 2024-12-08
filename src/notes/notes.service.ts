import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schema/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = new this.noteModel(createNoteDto);
    return newNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const updatedNote = await this.noteModel.findByIdAndUpdate(
      id,
      updateNoteDto,
      {
        new: true,
      },
    );

    if (!updatedNote) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return updatedNote;
  }

  async delete(id: string): Promise<void> {
    const result = await this.noteModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }
}
