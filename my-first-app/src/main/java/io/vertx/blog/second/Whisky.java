package io.vertx.blog.second;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by kronuz on 28/05/16.
 */
public class Whisky {

    private static final AtomicInteger COUNTER = new AtomicInteger();

    private final int id;

    private String name;

    private String origin;

    public Whisky(String name, String origin) {
        this.id = COUNTER.getAndIncrement();
        this.name = name;
        this.origin = origin;
    }

    public Whisky() {
        this.id = COUNTER.getAndIncrement();
    }

    public String getName() {
        return name;
    }

    public String getOrigin() {
        return origin;
    }

    public int getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}
