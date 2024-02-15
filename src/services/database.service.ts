class DatabaseService {
  private readonly Model: any;

  constructor(Model: any) {
    this.Model = Model;
  }

  public async create(payload) {
    try {
      const result = await this.Model.create(payload);
      return { status: true, result };
    } catch (error) {
      return { status: false, error };
    }
  }

  public async find(query) {
    try {
      const result = await this.Model.findOne(query);
      if (result) {
        return { status: true, result };
      } else if (!result) {
        return { status: false, result };
      }
    } catch (error) {
      return { status: false, error };
    }
  }

  public async findAll(query = null, page = null, limit = null) {
    try {
      const result = await this.Model.find(query).limit(limit).skip(limit*page)
      if (result) {
        return { status: true, result };
      } else if (!result) {
        return { status: false, result };
      }
    } catch (error) {
      return { status: false, error };
    }
  }

  public async update(query, payload) {
    try {
      await this.Model.updateOne(query, payload);
      return { status: true };
    } catch (error) {
      return { status: false, error };
    }
  }

  public async delete(query) {
    try {
        const result = await this.Model.deleteOne(query);
        if (result.deletedCount === 1) {
            return { status: true };
        } else {
            return { status: false, error: 'Document not found' };
        }
    } catch (error) {
        return { status: false, error };
    }
}

}

export default DatabaseService;
